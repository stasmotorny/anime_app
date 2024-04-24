import React from 'react';
import {GroupAccordion} from './groupAccordion.tsx';
import {GroupedObject} from '../types/groupedObject.ts';

type Props = {
  groupedItems: GroupedObject;
};

export const Groups = (props: Props) => {
  const {groupedItems} = props;

  const groups = Object.keys(groupedItems);

  return (
    <>
      {groups.map(group => (
        <GroupAccordion
          accordionData={groupedItems[group]}
          title={group}
          key={group}
        />
      ))}
    </>
  );
};
