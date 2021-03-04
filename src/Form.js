import React, { Component } from 'react';
import NestedForm from './NestedForm';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formArray: [],
      // formArray: [
      //   {
      //     id: 1,
      //     title: 'Parent 1',
      //     children: [
      //       {
      //         id: 11,
      //         title: 'Children 1',
      //       },
      //       {
      //         id: 12,
      //         title: 'Children 2',
      //         children: [
      //           {
      //             id: 111,
      //             title: 'Inner Children 1',
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     id: 2,
      //     title: 'Parent 2',
      //     children: [
      //       {
      //         id: 21,
      //         title: 'Children 1',
      //       },
      //     ],
      //   },
      // ],
      entries: [
        {
          id: '12',
          parentId: '0',
          text: 'Man',
          level: '1',
          children: null,
        },
        {
          id: '6',
          parentId: '12',
          text: 'Boy',
          level: '2',
          children: null,
        },
        {
          id: '7',
          parentId: '12',
          text: 'Other',
          level: '2',
          children: null,
        },
        {
          id: '9',
          parentId: '0',
          text: 'Woman',
          level: '1',
          children: null,
        },
        {
          id: '11',
          parentId: '9',
          text: 'Girl',
          level: '2',
          children: null,
        },
        {
          id: '111',
          parentId: '7',
          text: 'Other 1',
          level: '3',
          children: null,
        },
        {
          id: '112',
          parentId: '7',
          text: 'Other 2',
          level: '3',
          children: null,
        },
      ],
    };
  }

  componentDidMount() {
    const { entries } = this.state;

    this.setState({ formArray: this.buildListToTree(entries) });
  }

  buildListToTree = (list) => {
    var map = {},
      node,
      roots = [],
      i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== '0') {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  };

  handleInputChange = (id, e) => {
    const { value } = e.target;
    const { entries } = this.state;

    const index = entries.findIndex((item) => {
      return item.id === id;
    });

    entries[index].text = value;

    this.setState({ entries, formArray: this.buildListToTree(entries) });
  };

  handleAddLevel = (item, e) => {
    if (e.keyCode === 13) {
      const { entries } = this.state;
      entries.push({
        id: new Date().getTime(),
        parentId: item.parentId,
        text: '',
        level: item.level,
        children: null,
      });

      this.setState({ entries, formArray: this.buildListToTree(entries) });
    }
  };

  render() {
    const { formArray } = this.state;

    return (
      <div style={{ padding: 20 }}>
        <NestedForm
          arr={formArray}
          handleInputChange={this.handleInputChange}
          handleAddLevel={this.handleAddLevel}
        />
      </div>
    );
  }
}

export default Form;
