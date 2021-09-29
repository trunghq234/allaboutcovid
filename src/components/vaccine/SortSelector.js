import React from 'react';
import { Select, Form } from 'antd';
import syringe from '../../assets/images/syringe.png';
import people from '../../assets/images/people.png';
import sort from '../../assets/images/sort.png';

const { Option } = Select;
export default function SortSelector({ sortOption, handleChange }) {
  return (
    <Form
      initialValues={{
        selectedOption: '2',
      }}>
      <Form.Item
        style={{ margin: '0px' }}
        name="selectedOption"
        rules={[{ required: true }]}>
        <Select
          className="sortSelector"
          value={sortOption}
          onSelect={handleChange}
          size="large"
          placeholder="Select a country"
          style={{ width: 220 }}>
          <Option value="1" key="1">
            <div className="optionContainer">
              <img height="18px" width="18px" alt="sort" src={sort} />
              <p>Alphabetical</p>
            </div>
          </Option>
          <Option value="2" key="2">
            <div className="optionContainer">
              <img height="18px" width="18px" alt="syringe" src={syringe} />
              <p>Doses Administered</p>
            </div>
          </Option>
          <Option value="3" key="3">
            <div className="optionContainer">
              <img height="18px" width="18px" alt="people" src={people} />
              <p>% fully vaccinated</p>
            </div>
          </Option>
        </Select>
      </Form.Item>
    </Form>
  );
}
