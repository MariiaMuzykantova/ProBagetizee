import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import test from '../../calls/config'

const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF'
  }
})(Typography)

const NavItem = ({ isActive, text }) => (
  <NavItemWrapper isActive={isActive}>
    <WhiteTextTypography variant="h6">{text}</WhiteTextTypography>
  </NavItemWrapper>
)

const ProjectPanelItem = ({ children }) => (
  <div style={{ flex: 1 }}>{children}</div>
)

const ProjectPanel = ({
  projectName,
  tasksAmount,
  tasksDone,
  peopleAmout,
  status,
  tags
}) => (
  <Panel>
    <ProjectPanelItem>
      <Typography variant="h6">{projectName}</Typography>
      <Typography variant="ingress">{tags}</Typography>
    </ProjectPanelItem>

    <ProjectPanelItem>
      <Typography variant="h6">
        {tasksDone}/{tasksAmount}
      </Typography>
      <Typography variant="ingress">Tasks done</Typography>
    </ProjectPanelItem>

    <ProjectPanelItem>
      <Typography variant="h6">{peopleAmout}</Typography>
      <Typography variant="ingress">People</Typography>
    </ProjectPanelItem>

    <ProjectPanelItem>
      <Typography variant="h6">{status}</Typography>
      <Typography variant="ingress">Status</Typography>
    </ProjectPanelItem>
  </Panel>
)

const Projects = () => {
  useEffect(() => {
    console.log(test())

  }, [])
  return (
    <MainWrapper>
      <LeftPanel>
        <WhiteTextTypography style={{ paddingLeft: '40px' }} variant="h5">
          ProBudgetizer
        </WhiteTextTypography>

        <Gutter />
        <Gutter />

        <div>
          <NavItem isActive text="Projects" />
          <NavItem text="Profile" />
          <NavItem text="About" />
          <NavItem text="Contact list" />
          <NavItem text="Help" />
        </div>
      </LeftPanel>

      <RightPanel>
        <Typography variant="h5">Your Projects</Typography>

        <Gutter />

        <ProjectPanel
          tags="Cottage"
          projectName="Terrace"
          tasksDone={5}
          tasksAmount={9}
          peopleAmout={7}
          status="In progress"
        />

        <ProjectPanel
          projectName="Trip to Africa"
          tasksDone={5}
          tasksAmount={9}
          peopleAmout={7}
          status="In progress"
        />

        <ProjectPanel
          projectName="Fixing roof"
          tasksDone={5}
          tasksAmount={9}
          peopleAmout={7}
          status="In progress"
        />

        <ProjectPanel
          projectName="School stuff"
          tasksDone={5}
          tasksAmount={9}
          peopleAmout={7}
          status="In progress"
        />

      </RightPanel>
    </MainWrapper>
  )
}

export default Projects

const MainWrapper = styled.div`
  display: flex;
  background-color: lightblue;
  height: 100vh;
  width: 100vw;
`

const LeftPanel = styled.div`
  background-color: #5b7cfd;
  padding-top: 40px;
  width: 250px;
`

const RightPanel = styled.div`
  background-color: #e7eef7;
  flex: 1;
  padding-left: 100px;
  padding-top: 40px;
`

const NavItemWrapper = styled.div`
  background-color: ${(props) => (props.isActive ? '#2854ff' : undefined)};
  height: 70px;
  padding-left: 40px;
  display: flex;
  width: 100%;
  align-items: center;
  vertical-align: center;
  &:hover {
    background-color: #2854ff;
    cursor: pointer;
  }
`

const Gutter = styled.div`
  height: 50px;
  width: auto;
`

const Panel = styled.div`
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 15px 25px;
  box-shadow: 0px 1px 1px 0px #888888;
  width: 90%;
  height: 90px;
  border-radius: 8px;
  display: flex;
  background-color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`
