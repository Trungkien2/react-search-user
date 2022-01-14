import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = React.useContext(GithubContext);

  let languages = repos.reduce((total, currItem) => {
    const { language, stargazers_count } = currItem;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, start: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        start: total[language].start + 1,
      };
    }
    return total;
  }, {});

  let mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  let mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.start - a.start;
    })
    .map((item) => {
      return { ...item, value: item.start };
    })
    .slice(0, 5);

  let {start,forks} = repos.reduce((total, currItem)=>{
    const {stargazers_count,name,forks} = currItem;
    total.start[stargazers_count] = {label: name,value : stargazers_count};
    total.forks[forks] = {label : name , value : forks}
    return total
  },{
    start : {},
    forks : {}
  })
  start = Object.values(start).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();


  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={start} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data = {forks}/> 
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;