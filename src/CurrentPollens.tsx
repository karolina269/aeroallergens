import { Position } from "./App";

interface CurrentPollensProps {
  currentPosition: Position;
}

const CurrentPollens = (props: CurrentPollensProps) => {
  //

  return (
    <section className="currentPollens">
      CurrentPollens at {props.currentPosition.lat} {props.currentPosition.lng}
    </section>
  );
};

export default CurrentPollens;
