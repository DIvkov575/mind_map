
The original term for a physical terminal device — a hardware console with a keyboard and display (or literally a teletype printer, historically). 

In Unix, "tty" now generally refers to any device that 
provides terminal semantics to a process: 
- line discipline
- job control (Ctrl-C, Ctrl-Z)
- echo
- window size
- etc. 

The generic kernel interface is /dev/tty*.