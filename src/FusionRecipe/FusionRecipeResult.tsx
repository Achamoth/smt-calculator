import classNames from "classnames";
import { Demon } from "../classes/Demon";
import { FusionRecipe } from "../classes/FusionRecipe";
import styles from "./FusionRecipeResult.module.css";

function traverseRecipe(recipe: FusionRecipe) {
  let recipeStack = [];
  let recipeQueue = [recipe];

  while (recipeQueue.length) {
    let currentRecipe = recipeQueue.shift()!;
    recipeStack.push(currentRecipe);
    currentRecipe.recipes.forEach((r) => {
      recipeQueue.push(r);
    });
  }

  return recipeStack;
}

function skillString(skillsFromComponent: string[]) {
  let result = "";
  skillsFromComponent.forEach((s, i) => {
    result += s;
    if (skillsFromComponent.length > i + 1) result += ", ";
  });
  return result;
}

interface SkillRowsProps {
  demons: Demon[];
  skills: string[];
  numColumns: number;
}

function SkillRows(props: SkillRowsProps) {
  let demonsWithTargetSkills = props.demons.filter(
    (d) =>
      d.skills.map((s) => s.name).filter((s) => props.skills.includes(s)).length
  );

  return (
    <>
      {demonsWithTargetSkills.map((d) => {
        let skillsOnDemon = d.skills
          .map((s) => s.name)
          .filter((s) => props.skills.includes(s));

        return (
          <tr key={d.name} className={styles.recipeTableSkillRow}>
            <td></td>
            <td colSpan={props.numColumns + 1}>{`${d.race} ${
              d.name
            }: ${skillString(skillsOnDemon)}`}</td>
          </tr>
        );
      })}
    </>
  );
}

interface FusionRecipeResultProps {
  skills: string[];
  recipe: FusionRecipe;
  components: string[];
}

export function FusionRecipeResult(props: FusionRecipeResultProps) {
  let stack = traverseRecipe(props.recipe);
  let maxComponents = Math.max(...stack.map((r) => r.recipes.length));
  let i = 1;

  return (
    <div>
      <table className={styles.recipeTable}>
        <thead>
          <tr key={"recipeResultHeader"}>
            <th></th>
            <th className={styles.recipeTableHeader}>Result</th>
            {[...Array.from(Array(maxComponents).keys())].map((j) => {
              return (
                <th className={styles.recipeTableHeader}>Component {j + 1}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {stack.reverse().map((r) => {
            if (r.recipes.length) {
              return (
                <>
                  <tr key={i} className={styles.recipeTableRow}>
                    <td className={styles.recipeTableResultCell}>{i++}</td>
                    <td
                      className={styles.recipeTableResultCell}
                    >{`${r.demon.race} ${r.demon.name}`}</td>
                    {r.recipes.map((rr) => {
                      let cellClass = classNames(
                        styles.recipeTableComponentCell,
                        {
                          [`${styles.recipeTableDesiredComponent}`]:
                            props.components.includes(rr.demon.name),
                        }
                      );
                      return (
                        <td
                          key={`${i}${rr.demon.name}`}
                          className={cellClass}
                        >{`${rr.demon.race} ${rr.demon.name}`}</td>
                      );
                    })}
                  </tr>
                  <SkillRows
                    demons={r.recipes.map((r) => r.demon)}
                    skills={props.skills}
                    numColumns={maxComponents}
                  />
                </>
              );
            } else {
              return <></>;
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
