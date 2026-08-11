**Verbose Narrative Description**
Kernel constructs that makes program think its talking to a real terminal (when really its another program)

Terminal programs (vim, bash, top) are written assuming a human is at a physical terminal: they expect line editing, Ctrl-C, screen resizing, etc. But often you want to drive that same program from another program instead — ssh, tmux, a terminal emulator, an IDE. 

The program can't tell the difference and shouldn't have to. The pty exists so software can impersonate a terminal convincingly enough that unmodified terminal programs just work.

**How it works**
- uart driver | pty driver

Take fucking "TTY FD and PTY fd" cross linked via driver. 
write on one side literally [[memcpy]]'s imto the other side's read buffer.

Let A be slave (client) and B master (server)

Slave = the end that calls read() to get keystrokes and write() to print to the "screen." That's literally what a shell/program does with stdin/stdout — so the slave fd gets dup2'd onto fd 0/1/2 of the program you're running.

Master = the end that does the opposite — write() to inject keystrokes, read() to capture what got printed.

\* its a byte pipe between two fds
\* but throw in some features
- persisstent state attached to the fd: termios struct (echo on/off, canonical mode, control-char mapping), session id, fg process group
- Generates signals base don contents
	- 0x03 fires SIGINT at a process group instead of handing you the byte
- Filesystem identityt


**How it works (C++ Bullshit) (idk why i bother including this from claude)**
- Get master [[File Descriptor (FD)]] which auto creates the paired slave
```int master_fd = p[em("/dev/ptmx", O_RDWR)]```
- Unlock and discover hte slave's name 
```
unlockpt(master_fd);
char *slave_name = ptsname(master_fd); //"/dev/pts/N"
```
3. Fork
```
pid_t pid = fork();
```

4. In the child: detach from the old terminal, attach the new one
```
if (pid == 0) {
    setsid();                              // new session, no controlling tty yet
    int slave_fd = open(slave_name, O_RDWR);
    ioctl(slave_fd, TIOCSCTTY, 0);          // make this the controlling tty
    dup2(slave_fd, 0);                      // stdin
    dup2(slave_fd, 1);                      // stdout
    dup2(slave_fd, 2);                      // stderr
    close(master_fd);                       // child never touches the master
    execvp("bash", argv);                   // bash now thinks it's on a real terminal
}
```
5. In the parent: drive it via the master
```
// pid != 0 (parent)
write(master_fd, "ls\n", 3);       // as if a human typed it
read(master_fd, buf, sizeof(buf)); // capture bash's screen output
```


-----
Real [[Teletypewritter (TTY)]] is backed by hardware. PTTY is a software-only pair of virtual [[Device (Kernel)]]s that hte kernle exposes

Master Side (PTY) - held by controlling program (terminal emulator, sshd, tmux, Claude, etc)
Slave side (TTY) - held my the child process (eg. vim, top, etc) which sees it as "/dev/pts/N" (linux) or "/dev/ttysN" (BSD)