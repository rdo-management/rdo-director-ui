export default function createMockStoreDone (done) {
  return e => {
    if(e instanceof Error) {
      done.fail(e);
    }
    else {
      done(e);
    }
  }
};

