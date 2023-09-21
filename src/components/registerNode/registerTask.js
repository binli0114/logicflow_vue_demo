export default function registerTask (lf) {
  lf.register('task', ({ RectNode, RectNodeModel, h }) => {
    class View extends RectNode {
      getShape() {
        const {model} = this.props
        const {width, height, x, y} = model
        const position = {
          x: x - width / 2,
          y: y- height / 2,
        }
        const style = model.getNodeStyle()
        return h("rect", {
          ...style,
          ...position,
        });
      }
    }
    class Model extends RectNodeModel {
      constructor (data, graphModel) {
        super(data, graphModel)
        this.menu = [
          {
            className: 'lf-menu-delete',
            text: 'delete',
            callback (node) {
              // const comfirm = window.confirm('你确定要删除吗？')
              lf.deleteNode(node.id)
            }
          },
          {
            text: 'edit',
            className: 'lf-menu-item',
            callback (node) {
              lf.editText(node.id)
            }
          },
          {
            text: 'copy',
            className: 'lf-menu-item',
            callback (node) {
              lf.cloneNode(node.id)
            }
          }
        ]
        this.radius = 20;
      }
    }
    return {
      view: View,
      model: Model
    }
  })
}
