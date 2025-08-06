import { ReplyCounterPipe } from './reply-counter.pipe';

describe('ReplyCounterPipe', () => {
  it('create an instance', () => {
    const pipe = new ReplyCounterPipe();
    expect(pipe).toBeTruthy();
  });
});
