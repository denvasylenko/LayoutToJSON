import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntdButton, Input as AntdInput } from 'antd';

// Button Component
const Container = ({ label, name }) => {
  return <div>{name}</div>
};

Container.propsMeta = {
  columns: {
    type: 'string'
  },
  space: {
    type: 'string'
  }
};

// Button Component
const Button = ({ label, name }) => {
  return <button>{name}</button>
};

Button.propsMeta = {
  label: {
    type: 'string'
  },
  name: {
    type: 'string'
  }
};

// Input Component
const Input = ({ placeholder, name }) => {
  return <input type="checkbox" id={name} />
};

Input.propsMeta = {
  placeholder: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
};

// Checkbox Component
const Checkbox = ({ label, name }) => {
  return (
    <div>
      <input type="checkbox" id={name} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

Checkbox.propsMeta = {
  label: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
};

// Dropdown Component
const Dropdown = ({ label, name, options }) => {
  return (
    <select name={name}>
      <option value="">{label}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

Dropdown.propsMeta = {
  label: {
    type: 'string'
  },
  name:{
    type: 'string'
  },
  options: {
    type: 'object',
    defaultValue: JSON.stringify([
      {
        label: 'Hello',
        value: 'World',
      }
    ])
    
  }
};


export const COMPONENTS = { Container, Button, Input, Checkbox, Dropdown };
