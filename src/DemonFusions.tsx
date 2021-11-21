import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { TextField } from "@mui/material";
import { Demon } from "./classes/Demon";
import { FusionData } from "./utils/types";
import { getFusionCombinations } from "./utils/demon_fusion";
import styles from "./DemonFusions.module.css";
import globalStyles from "./globals.module.css";

interface DemonFusionsProps {
  fusionData: FusionData;
  demon: Demon;
}

function matchesFilter(demon: Demon, filter: string) {
  return demon.name.toLowerCase().startsWith(filter.toLowerCase());
}

export function DemonFusions(props: DemonFusionsProps) {
  let fusionCombinations = getFusionCombinations(props.demon, props.fusionData);
  let maxComponents =
    fusionCombinations.length > 0
      ? Math.max(...fusionCombinations.map((r) => r.length))
      : 0;

  let [filter, setFilter] = useState("");
  let filteredFusionCombinations = fusionCombinations.filter(
    (f) => matchesFilter(f[0], filter) || matchesFilter(f[1], filter)
  );

  let isSpecialFusion = fusionCombinations.length < 2;
  let tableClass = classNames(
    { [styles.fusionCombinationsSpecialFusion]: isSpecialFusion },
    { [styles.fusionCombinations]: !isSpecialFusion },
    styles.fusionCombinationsTable
  );

  return (
    <div className={globalStyles.centeredContainer}>
      <div className={globalStyles.blockContainerFullWidth}>
        {!isSpecialFusion && (
          <div className={styles.filter}>
            <TextField
              fullWidth
              label="Filter..."
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilter(e.target.value)
              }
            />
          </div>
        )}
        <table className={tableClass}>
          <thead>
            <tr key="fusionHeader">
              {[...Array.from(Array(maxComponents).keys())].map((i) => {
                return (
                  <th className={styles.fusionCombinationsHeader}>
                    Component {i + 1}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredFusionCombinations.map((c) => {
              return (
                <tr
                  className={styles.fusionRow}
                  key={`${c[0].name}-${c[1].name}`}
                >
                  {/* Redo key */}
                  {c.map((component) => {
                    return (
                      <td className={styles.fusionCombinationsCell}>
                        <Link
                          to={`/${component.name.toLowerCase()}`}
                        >{`LV${component.level} ${component.race} ${component.name}`}</Link>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
