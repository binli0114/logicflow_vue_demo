export default function registerEmail(lf) {
  lf.register('email', ({ RectNode, RectNodeModel, h }) => {
    class Node extends RectNode {
      getLabelShape() {
        const { model } = this.props;
        const { x, y, width, height } = model;
        const style = model.getNodeStyle();
        return h(
            "svg",
            {
              x: x - width / 2 + 5,
              y: y - height / 2 + 5,
              width: 24,
              height: 24,
              viewBox: "0 0 24 24"
            },
            h("path", {
              fill: "none",
              d: "M0 0h24v24H0z"
            }),
            h("path", {
              fill: style.stroke,
              d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            })
        );
      }
      /**
       * 完全自定义节点外观方法
       */
      getShape() {
        const { model } = this.props;
        const { x, y, width, height, radius } = model;
        const style = model.getNodeStyle();
        return h("g", {}, [
          h("rect", {
            ...style,
            x: x - width / 2,
            y: y - height / 2,
            rx: radius,
            ry: radius,
            width,
            height
          }),
          this.getLabelShape()
        ]);
      }


    }
    class Model extends RectNodeModel {
      constructor(data, graphModel) {
        data.text = {
          value: (data.text && data.text.value) || '',
          x: data.x,
          y: data.y + 50
        }
        super(data, graphModel)
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

        super.initNodeData(data)
        this.radius = 10;
      }
      getNodeStyle() {
        const style = super.getNodeStyle();
        style.stroke = "blue";
        //style.strokeDasharray = "3 3";
        return style;
      }

    }
    return {
      view: Node,
      model: Model
    }
  })
}
