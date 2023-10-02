export const nodeList = [
  {
    text: 'Start',
    type: 'start',
    class: 'node-start'
  },
  {
    text: 'Task',
    type: 'task',
    class: 'node-rect'
  },
  {
    type: 'user',
    text: 'User',
    class: 'node-user'
  },
  {
    type: 'push',
    text: 'Message',
    class: 'node-push'
  },
  {
    type: 'download',
    text: 'Download',
    class: 'node-download'
  },
  {
    type: 'email',
    text: 'Email',
    class: 'node-email'
  },
  {
    type: 'end',
    text: 'End',
    class: 'node-end'
  }
]

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
