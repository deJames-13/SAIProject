import { buttonClasses } from '@mui/base/Button';
import { default as BaseTab, tabClasses } from '@mui/base/Tab';
import { default as BaseTabPanel } from '@mui/base/TabPanel';
import { default as Tabs } from '@mui/base/Tabs';
import { default as BaseTabsList } from '@mui/base/TabsList';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import * as React from 'react';

export default function MDTabs({ tabs }) {
  return !tabs?.length > 0 ? '' : (
    <Tabs defaultValue={0}>
      <TabsList>
        {tabs.map((tab, index) => (
          <Tab key={index} value={index}>
            {tab.name}
          </Tab>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={index}>
          {tab.element}
        </TabPanel>
      ))}
    </Tabs>
  );
}

MDTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      element: PropTypes.node.isRequired,
    })
  ).isRequired,
};

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  height: 100%;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  height: 100%;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.4)' : 'rgba(0,0,0, 0.2)'
    };
  height: 100%;
  `,
);