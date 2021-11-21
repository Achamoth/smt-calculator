import { Demon } from "../classes/Demon";
import { FusionRecipe } from "../classes/FusionRecipe";
import "./FusionRecipeResult.css";

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
          <tr className="recipeTableSkillRow">
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
}

export function FusionRecipeResult(props: FusionRecipeResultProps) {
  let stack = traverseRecipe(props.recipe);
  let maxComponents = Math.max(...stack.map((r) => r.recipes.length));
  let i = 1;

  return (
    <div>
      <table className="recipeTable">
        <thead>
          <tr>
            <th></th>
            <th className="recipeTableHeader">Result</th>
            {[...Array.from(Array(maxComponents).keys())].map((i) => {
              return <th className="recipeTableHeader">Component {i + 1}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {stack.reverse().map((r) => {
            if (r.recipes.length) {
              return (
                <>
                  <tr className="recipeTableRow">
                    <td className="recipeTableResultCell">{i++}</td>
                    <td className="recipeTableResultCell">{`${r.demon.race} ${r.demon.name}`}</td>
                    {r.recipes.map((rr) => {
                      return (
                        <td className="recipeTableComponentCell">{`${rr.demon.race} ${rr.demon.name}`}</td>
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
