export const toAsync = async<T, K>(promise: any): Promise<{ data: T, err: K }> => {
  return new Promise(resolve => promise.then((data: T) => resolve({ data, err: null })).catch((err: K) => resolve({ data: null, err })))
}