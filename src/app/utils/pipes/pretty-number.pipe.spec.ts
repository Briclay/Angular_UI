import { PrettyNumberPipe } from './pretty-number.pipe';

describe('PrettyNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new PrettyNumberPipe('1');
    expect(pipe).toBeTruthy();
  });
});
