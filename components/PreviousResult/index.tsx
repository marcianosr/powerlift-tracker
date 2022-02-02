import React, { FC } from "react";
import { WeightRPE } from "../ExcersiseList";

type PreviousResultProps = {
	previousLifts: WeightRPE;
};

const PreviousResult: FC<PreviousResultProps> = ({ previousLifts }) => (
	<section>
		<strong>Vorig resultaat</strong>
		<div>
			{previousLifts.weight} @ {previousLifts.RPE}
		</div>
	</section>
);

export default PreviousResult;
