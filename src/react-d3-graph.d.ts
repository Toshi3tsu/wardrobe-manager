declare module 'react-d3-graph' {
  import { Component } from 'react';

  export interface GraphProps {
    id: string;
    data: any;
    config?: any;
    onClickNode?: (nodeId: string) => void;
    onClickLink?: (source: string, target: string) => void;
    onRightClickNode?: (event: any, nodeId: string) => void;
    onMouseOverNode?: (nodeId: string) => void;
    onMouseOutNode?: (nodeId: string) => void;
    [key: string]: any; // その他のオプションを許可
  }

  export class Graph extends Component<GraphProps> {}
}
