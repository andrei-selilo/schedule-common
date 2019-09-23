// TODO: implement

export default ({ secrets }) => ({
  /**
   * Counts average time of service request
   * This info may help with defining bottlenecks
   */
  publishScheduleTime: (time) =>
    console.log('published time', time, 'secrets', secrets),
});
