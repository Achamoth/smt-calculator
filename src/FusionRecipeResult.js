function traverseRecipe(recipe) {
  let recipeStack = [];
  let recipeQueue = [recipe];

  while (recipeQueue.length) {
    let currentRecipe = recipeQueue.shift();
    recipeStack.push(currentRecipe);
    currentRecipe.recipes.forEach((r) => {
      recipeQueue.push(r);
    });
  }

  return recipeStack;
}

function skillString(skillsFromComponent) {
  let result = "";
  skillsFromComponent.forEach((s, i) => {
    result += s;
    if (skillsFromComponent.length > i + 1) result += ", ";
  });
  return result;
}

function SkillRows(props) {
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
            <tr className="recipeTableSkillCell">
              <td></td>
              <td>{`${d.race} ${d.name}: ${skillString(skillsOnDemon)}`}</td>
            </tr>
          );
        })}
    </>
  );
}

export function FusionRecipeResult(props) {
  let stack = traverseRecipe(props.recipe);
  let maxComponents = Math.max(...stack.map((r) => r.recipes.length));
  let i = 1;

  return (
    <div>
      <table className="recipeTable">
        <thead>
          <tr>
            <th></th>
            <th>Result</th>
            {[...Array(maxComponents).keys()].map((i) => {
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
                    <td>{i++}</td>
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
