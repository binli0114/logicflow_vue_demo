export default function registerTask(lf) {
  lf.register('task', ({ RectNode, RectNodeModel, h }) => {
    class View extends RectNode {
      getLabelShape() {
        const { model } = this.props;
        const { x, y, width, height } = model;
        const style = model.getNodeStyle()
        return h(
          'svg',
          {
            x: x - width / 2 + 5,
            y: y - height / 2 + 5,
            width: 24,
            height: 24,
            viewBox: '0 0 24 24'
          },
          h("path", {
            fill: "none",
            d: "M0 0h24v24H0z"
          }),
          h("path", {
            fill: style.stroke,
            d: "M 19.14 12.94 c 0.04 -0.3 0.06 -0.61 0.06 -0.94 c 0 -0.32 -0.02 -0.64 -0.07 -0.94 l 2.03 -1.58 c 0.18 -0.14 0.23 -0.41 0.12 -0.61 l -1.92 -3.32 c -0.12 -0.22 -0.37 -0.29 -0.59 -0.22 l -2.39 0.96 c -0.5 -0.38 -1.03 -0.7 -1.62 -0.94 L 14.4 2.81 c -0.04 -0.24 -0.24 -0.41 -0.48 -0.41 h -3.84 c -0.24 0 -0.43 0.17 -0.47 0.41 L 9.25 5.35 C 8.66 5.59 8.12 5.92 7.63 6.29 L 5.24 5.33 c -0.22 -0.08 -0.47 0 -0.59 0.22 L 2.74 8.87 C 2.62 9.08 2.66 9.34 2.86 9.48 l 2.03 1.58 C 4.84 11.36 4.8 11.69 4.8 12 s 0.02 0.64 0.07 0.94 l -2.03 1.58 c -0.18 0.14 -0.23 0.41 -0.12 0.61 l 1.92 3.32 c 0.12 0.22 0.37 0.29 0.59 0.22 l 2.39 -0.96 c 0.5 0.38 1.03 0.7 1.62 0.94 l 0.36 2.54 c 0.05 0.24 0.24 0.41 0.48 0.41 h 3.84 c 0.24 0 0.44 -0.17 0.47 -0.41 l 0.36 -2.54 c 0.59 -0.24 1.13 -0.56 1.62 -0.94 l 2.39 0.96 c 0.22 0.08 0.47 0 0.59 -0.22 l 1.92 -3.32 c 0.12 -0.22 0.07 -0.47 -0.12 -0.61 L 19.14 12.94 Z M 12 15.6 c -1.98 0 -3.6 -1.62 -3.6 -3.6 s 1.62 -3.6 3.6 -3.6 s 3.6 1.62 3.6 3.6 S 13.98 15.6 12 15.6 Z"
          })
        )
      }

      getShape() {
        const { model } = this.props
        const { width, height, x, y, radius } = model

        const style = model.getNodeStyle()
        return h('g', {  }, [
          h('rect', {
            ...style,
            x: x - width / 2,
            y: y - height / 2,
            rx: radius,
            ry: radius,
            width,
            height
          }),
          this.getLabelShape()
        ])
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
        //style.stroke = "blue";
        //style.strokeDasharray = "3 3";
        return style;
      }
    }

    return {
      view: View,
      model: Model
    }
  })
}
