export function createRequestTimeout() {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  return { controller, timeout };
}
