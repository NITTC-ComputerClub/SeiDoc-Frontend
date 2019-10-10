import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateSystemsCreator, addTagCreator } from '../../../actions/action'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

import { System } from '../../../types/type';
import { fireStore, systemIndex } from '../../../firebase/firebase';
import Indicator from '../indicator';
import SystemCard from './SystemCard'

const StyledPopularSystemList = styled.div`
  position: relative;
  left: -24px;
  margin: 0;
  width: calc(100% + 48px);

  ul {
    list-style: none;
    margin: 0;
    padding: 0 24px 24px 24px;
    overflow-x: auto;
    white-space: nowrap;
  }

  a {
    position: relative;
    left: 24px;
  }
`

const LatestSystemList: React.FC = () => {
  const [latestSystem, setLatestSystem] = useState<Array<System>>([])
  const dispatch = useDispatch()
  const updateSystems = (newSystem: Array<System>) => dispatch(updateSystemsCreator(newSystem))
  const addTag = (newtag: string) => dispatch(addTagCreator(newtag))

  const isLoaded = () => {
    if (latestSystem.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  if (latestSystem.length === 0) {
    console.log("fetching")
    const systems: System[] = []
    fireStore.collection(systemIndex)
      .orderBy("CreatedAt", "desc").limit(5)
      .get().then(
        snapShot => {
          snapShot.docs.forEach(doc => {
            console.log(doc.data())
            systems.push(doc.data() as System)
          });
        }
      ).then(() => {
        setLatestSystem(systems)
      }
      ).catch(err => console.error("fetch failed", err))
  }

  return isLoaded() ? (
    <StyledPopularSystemList>
      <ul>
        {latestSystem.map(system => (
          <SystemCard key={system.Name} system={system} />
        ))}
      </ul>
      <Link to="/moredetails" onClick={() => {
        addTag('あたらしい制度')
        updateSystems(latestSystem)
      }}>さらに詳しく</Link>
    </StyledPopularSystemList>
  ) : (
      <Indicator />
    )
}

export default LatestSystemList