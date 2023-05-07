import WebSocket from 'ws';
import { server } from './server'; 

describe('WebSocket server', () => {
  const PORT = 3001;
  const serverURL = `ws://localhost:${PORT}`;
  let client: WebSocket;

  beforeEach((done) => {
    client = new WebSocket(serverURL);
    client.on('open', () => {
      console.log("TEST: client open");
      done();
    });
  });

  afterEach((done) => {
    client.on('close', () => {
      done();
    });
    client.close();
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });
  

  it('should echo messages', (done) => {
    const message: string = 'Hello, WebSocket!';
  
    client.on('message', (receivedMessage: ArrayBuffer) => {
      const decoder = new TextDecoder();
      const decodedMessage = decoder.decode(receivedMessage);
      expect(typeof decodedMessage).toBe('string');
      expect(decodedMessage).toBe(message+"-FromServer");
      done();
    });
    
    client.send(message);
  });
  
});
