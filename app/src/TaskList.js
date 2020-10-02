import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class TaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {tasks: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/tasks')
      .then(response => response.json())
      .then(data => this.setState({tasks: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/task/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedTasks = [...this.state.tasks].filter(i => i.id !== id);
      this.setState({tasks: updatedTasks});
    });
  }


  async handleChecked(id) {
      console.log("hello something");
      const {task} = this.state;

      var url= '/api/task/'.concat((task.id).toString());
      var apiMethod='PUT';

      task.checked = !task.checked;

      await fetch(url, {
        method: apiMethod,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
      });
      this.props.history.push('/tasks');
    }

  render() {
    const {tasks, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const taskList = tasks.map(task => {
      return <tr key={task.id}>
        <td style={{whiteSpace: 'nowrap'}}>{task.name}</td>
        <td>{task.description}</td>
        <td>{task.dateUpdated}</td>
        <td><input type="checkbox" id="checked" name="checked" checked={task.checked} onclick="handleChecked({task.id})"/></td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/tasks/" + task.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(task.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/tasks/new">Add Task</Button>
          </div>
          <h3>My TaskTask</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">Description</th>
              <th>DateUpdated</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {taskList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default TaskList;