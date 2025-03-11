import { useEffect, useState } from "react";
import { list } from "./stubs";
import { slowFunction } from "./utils";
import "../styles.css";
import { memo } from "react";

const ComponentA = () => {
  /* Устанавливаем стейт счетчика */
  const [count, setCount] = useState(1);

  const testProp = { testCount: 0 };

  /* Ф-я инкрементирует count */
  const onClick = () => setCount((currentCount) => currentCount + 1);

  return (
    <div className="component">
      <h3>Component A</h3>
      <p>{`State Count: ${count}`}</p>
      <button className="button" onClick={onClick}>
        Update count
      </button>
      <MemoComponentB testProp={testProp} />
    </div>
  );
};

/** Пример тяжелых вычислений */

const ComponentB = ({ testProp }) => {
  const [count, setCount] = useState(0);
  const onClick = () => setCount(current => current + 1);

  /* Ф-я, выполняющая достаточно трудоемкий код */
  const result = slowFunction();

  return (
    <div className="component">
      <h3>Component B</h3>
      <p>{`Show result value: ${testProp}`}</p>
      <button className="button" onClick={onClick}>
        Update count
      </button>
      <ComponentC />
    </div>
  );
};

const MemoComponentB = memo(ComponentB);

/** Пример тяжелого рендеринга */
const ComponentCList = () => {
  return (
    <div>
      {list.map((item) => (
        <ComponentC key={item} id={item} />
      ))}
    </div>
  );
};

const MemoComponentClist = memo(ComponentCList);

const ComponentC = ({ id }) => {
  const title = `Component C ${id}`;
  return (
    <div className="component">
      <h3>Component C</h3>
      <ComponentD />
    </div>
  );
};

const ComponentD = memo(() => {
  return (
    <div className="component">
      <h3>Component D</h3>
    </div>
  )
})


export { ComponentA };
