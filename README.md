<div align="center">

<img src="https://raw.githubusercontent.com/kyranet/veza/main/static/logo.png" height="200">

# @sofidev/ipc

> **Note:**
> This is a fork of [kyranet/veza](https://github.com/kyranet/veza)
> We use [`msgpackr`][msgpackr] instead of [`binarytf`][binarytf] for encoding/decoding messages

[![npm version](https://img.shields.io/npm/v/@sofidev/ipc?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sofidev/ipc)
[![npm downloads](https://img.shields.io/npm/dt/@sofidev/ipc?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sofidev/ipc)

</div>

## About

**Veza** is a protocol that operates over either [IPC] or [TCP] with the only difference of one line of code to switch
between the two. Inspired on [node-ipc], it seeks to use modern, fast, and intuitive [API]s, as well as exposing all the
underlying back-ends for much higher customizability and extensibility, as well as a HTTP-like protocol where you can
send a message and optionally receive a response for it.

## Socket Support

- [x] Unix Socket or Windows Socket.
- [x] TCP Socket.
- [ ] TLS Socket.
- [ ] UDP Sockets.

> **TLS**: TLS sockets can be achieved by extending Veza to use SSL handshakes. To keep things simple and tidy, this is
> not shipped in core, but will be considered for future releases.

> **UDP**: UDP sockets are not supported due to Veza's requirement for messages to be reliably received in order.

## Messaging

All messages are encoded and decoded using [`msgpackr`][msgpackr], which allows a messages to be sent using the least
amount of bytes possible, increasing throughput; plus a 11-byte header at the start of each message. More information
available in [PROTOCOL].

## Documentation

All the documentation is available at [veza.js.org] and at [the wiki](https://github.com/kyranet/veza/wiki). You can
find examples of code [here](https://github.com/Sofi-Tech/ipc/tree/master/examples).

## Contributing

1. Fork it!
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -am 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request!

[binarytf]: https://www.npmjs.com/package/binarytf
[msgpackr]: https://www.npmjs.com/package/msgpackr
[protocol]: https://github.com/Sofi-Tech/ipc/blob/master/PROTOCOL.md
[api]: https://en.wikipedia.org/wiki/Application_programming_interface
[ipc]: https://en.wikipedia.org/wiki/Inter-process_communication
[tcp]: https://en.wikipedia.org/wiki/Transmission_Control_Protocol
[node-ipc]: https://www.npmjs.com/package/node-ipc
