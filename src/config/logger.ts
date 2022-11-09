// A basic abstraction so we can configure logging defaults, and even swap it out if we need to
import { Logger } from "tslog";

const log: Logger = new Logger();

export default log;
