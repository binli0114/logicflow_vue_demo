import Vue from 'vue'
import Connect from './DynamicConnectNode.vue'

export default function registerConnect(lf) {
  lf.register('connect', ({ HtmlNode, HtmlNodeModel }) => {
    class ConnectNode extends HtmlNode {
      setHtml(rootEl) {
        const { properties } = this.props.model
        const el = document.createElement('div')
        rootEl.innerHTML = ''
        rootEl.appendChild(el)
        const Profile = Vue.extend({
          render: function (h) {
            return h(Connect, {
              props: {
                name: properties.name
              },
              on: {
                'select-button': type => {
                  console.log('select-button', type)
                }
              }
            })
          }
        })
        new Profile().$mount(el)
      }
    }
    class ConnectNodeModel extends HtmlNodeModel {
      constructor(data, graphModel) {
        data.text = {
          value: (data.text && data.text.value) || '',
          x: data.x,
          y: data.y + 50
        }
        super(data, graphModel)
        // 右键菜单自由配置，也可以通过边的properties或者其他属性条件更换不同菜单
        this.menu = [
          {
            className: 'lf-menu-delete',
            text: 'delete',
            callback(node) {
              // const comfirm = window.confirm('你确定要删除吗？')
              lf.deleteNode(node.id)
            }
          },
          {
            text: 'edit',
            className: 'lf-menu-item',
            callback(node) {
              lf.editText(node.id)
            }
          },
          {
            text: 'copy',
            className: 'lf-menu-item',
            callback(node) {
              lf.cloneNode(node.id)
            }
          }
        ]
      }
      initNodeData(data) {
        if (data.text) {
          data.text.editable = false
        }
        super.initNodeData(data)
        const width = 300
        const height = 150
        this.width = width
        this.height = height
        this.anchorsOffset = [
          [width / 2, 0],
          [0, height / 2],
          [-width / 2, 0],
          [0, -height / 2]
        ]
      }
    }
    return {
      view: ConnectNode,
      model: ConnectNodeModel
    }
  })
}
