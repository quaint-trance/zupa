type ResultSuccessType<T> = Readonly<[true, T]>;
type ResultErrorType = Readonly<[false, string]>;
type ResultType<T> = ResultSuccessType<T> | ResultErrorType;

class Result<G> {
  result: ResultType<G>;

  static ok<T>(value: T) {
    const newResult = new Result<T>();
    newResult.result = [true, value];
    return newResult;
  }

  static error<T>(error: string) {
    const newResult = new Result<T>();
    newResult.result = [false, error];
    return newResult;
  }

  map<T>(callback: (el: G) => T): Result<T> {
    if (!this.result[0]) return Result.error<T>(this.result[1]);
    return Result.ok(callback(this.result[1]));
  }

  then<T>(callback: (el: G) => Result<T>): Result<T> {
    if (!this.result[0]) return Result.error<T>(this.result[1]);
    return callback(this.result[1]);
  }

  log(): Result<G> {
    //console.log(this.result[0], this.result[1]);
    return this;
  }

  value(): G | null {
    return this.result[0] ? this.result[1] : null;
  }

  valueOr<O>(or: O): G | O {
    return this.result[0] ? this.result[1] : or;
  }
}
