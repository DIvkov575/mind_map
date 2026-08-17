


SO_REUSEPORT
Normally, only one socket can bind to a given (IP, port) pair. SO_REUSEPORT lets multiple sockets all bind to the same port simultaneously. The kernel then load-balances incoming connections/packets across them (typically via a hash of the connection tuple).


TCP_NODELAY
This disables [[Nagle's Algorithm]]. By default, TCP tries to be efficient by buffering small outgoing writes and coalescing them into fewer, larger packets before sending