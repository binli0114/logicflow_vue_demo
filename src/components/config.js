export const nodeList = [
  {
    text: '开始',
    type: 'start',
    class: 'node-start'
  },
  {
    text: '矩形',
    type: 'rect',
    class: 'node-rect'
  },
  {
    type: 'user',
    text: '用户',
    class: 'node-user'
  },
  {
    type: 'push',
    text: '推送',
    class: 'node-push'
  },
  {
    type: 'download',
    text: '位置',
    class: 'node-download'
  },
  {
    type: 'connect',
    text: 'Html',
    class: 'node-push'
  },
  {
    type: 'end',
    text: '结束',
    class: 'node-end'
  },
];

export const BpmnNode = [
  {
    type: 'bpmn:startEvent',
    text: 'Start Event',
    class: 'bpmn-start'
  },
  {
    type: 'bpmn:endEvent',
    text: 'End Event',
    class: 'bpmn-end'
  },
  {
    type: 'bpmn:exclusiveGateway',
    text: 'Gateway',
    class: 'bpmn-exclusiveGateway'
  },
  {
    type: 'bpmn:userTask',
    text: 'User Task',
    class: 'bpmn-user'
  },
  {
    type: 'bpmn:serviceTask',
    text: 'Service Task',
    class: 'bpmn-service'
  }
]
