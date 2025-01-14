/** @jsxFrag React.Fragment */

import React from 'react';
import { XYPosition } from 'react-flow-renderer';
import { DataType, MMELNode } from '../serialize/interface/baseinterface';
import { MMELRegistry } from '../serialize/interface/datainterface';
import {
  MMELApproval,
  MMELProcess,
} from '../serialize/interface/processinterface';
import { ModelType } from './mapper/model/mapperstate';

export class NodeContainer {
  id: string;
  type: string;
  data: NodeData;
  position: XYPosition;
  isHidden = false;

  constructor(x: MMELNode, pos: { x: number; y: number }) {
    this.id = x.id;
    this.position = pos;
    this.type = getNodeType(x.datatype);
    this.data = new NodeData(x);
  }
}

function getNodeType(datatype: DataType): string {
  if (datatype === DataType.STARTEVENT) {
    return 'start';
  } else if (datatype === DataType.ENDEVENT) {
    return 'end';
  } else if (datatype === DataType.TIMEREVENT) {
    return 'timer';
  } else if (datatype === DataType.EGATE) {
    return 'egate';
  } else if (datatype === DataType.SIGNALCATCHEVENT) {
    return 'signalcatch';
  } else if (datatype === DataType.PROCESS) {
    return 'process';
  } else if (datatype === DataType.APPROVAL) {
    return 'approval';
  } else if (
    datatype === DataType.REGISTRY ||
    datatype === DataType.DATACLASS
  ) {
    return 'data';
  }
  return 'default';
}

export class NodeData {
  label: JSX.Element;
  represent: string;
  modelType: ModelType | null;

  constructor(x: MMELNode) {
    this.represent = x.id;
    this.modelType = null;
    if (x.datatype === DataType.PROCESS) {
      const p = x as MMELProcess;
      this.label = <> {p.name === '' ? p.id : p.name} </>;
    } else if (x.datatype === DataType.APPROVAL) {
      const app = x as MMELApproval;
      this.label = <> {app.name === '' ? app.id : app.name} </>;
    } else if (x.datatype === DataType.REGISTRY) {
      const reg = x as MMELRegistry;
      this.label = <> {reg.title === '' ? reg.id : reg.title} </>;
    } else {
      this.label = <> {extractID(x.id)} </>;
    }
  }
}

function extractID(x: string) {
  const index = x.lastIndexOf('#');
  if (index >= 0) {
    return x.substr(index + 1);
  }
  return x;
}
