import { NodeTypes } from "@/constants";
import type { NodeCustomData, EdgeCustomData } from "./interface";
import type { Node, Edge } from "@vue-flow/core";

export type CustomNodeTypes = keyof typeof NodeTypes;

export type CustomNode = Node<NodeCustomData, any, CustomNodeTypes>;

export type CustomEdge = Edge<EdgeCustomData>;
