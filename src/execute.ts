import Scheduled from "./interfaces/scheduled";

export default function execute(scheduled: Array<Scheduled>, target) {
  // TODO: actually set the interval & do the execution
  console.log(scheduled);
  console.log(target);
}
