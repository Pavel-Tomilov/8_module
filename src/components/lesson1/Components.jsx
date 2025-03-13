import { useEffect, useState } from "react";
import { list } from "./stubs";
import { slowFunction } from "./utils";
import "../styles.css";
import { memo } from "react";

const ComponentA = () => {
  /* Устанавливаем стейт счетчика */
  const [count, setCount] = useState(0);
  const onClick = () => setCount(current => current + 1);

  const isBlack = count % 2 === 0;


  return (
    <div className="component" style={
      isBlack
        ? { backgroundColor: '#000000' }
        : { backgroundColor: 'initial' }}>
      <h3>Component A</h3>
      <p>{`Show result value: ${count}`}</p>
      <button className="button" onClick={onClick}>
        Update count
      </button>
      <ComponentB />
    </div>
  );

};

/** Пример тяжелых вычислений */

const ComponentB = ({ testProp }) => {


  /* Ф-я, выполняющая достаточно трудоемкий код */
  const result = slowFunction();

  return (
    <div className="component">
      <h3>Component B</h3>
      <p>{`Show result value: ${result}`}</p>

    </div>
  );
};

const MemoComponentB = memo(ComponentB, (prev, next) => {
  if (prev.testProp.testCount === next.testProp.testCount) {
    return true;
  }
  return false;
})


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

const content = <div>Content</div>;

const ComponentD = memo(() => {
  return (
    <div className="component">
      <h3>Component D</h3>
      {content}
    </div>
  )
})


export { ComponentA };
