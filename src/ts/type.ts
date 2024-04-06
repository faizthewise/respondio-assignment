import { NodeTypes } from "@/constants";
import type { NodeCustomData } from "./interface";
import type { Node } from "@vue-flow/core";

export type CustomNodeTypes = keyof typeof NodeTypes;

export type CustomNode = Node<NodeCustomData, any, CustomNodeTypes>;
