export default function registerGateway(lf) {
  lf.register('gateway', ({ PolygonNode, PolygonNodeModel, h }) => {
    class Node extends PolygonNode {
      getIconShape() {
        const { model } = this.props
        const { stroke } = model.getNodeStyle()
        return h(
          'svg',
          {
            x: 18,
            y: 18,
            width: 24,
            height: 24,
            viewBox: '0 -960 960 960'
          },
          h('path', {
            fill: stroke,
            d: 'm 196 -120 l -6 -51 l -8 -4 q -4 -2 -11 -7 l -48 20 l -44 -76 l 41 -31 v -21 l -41 -32 l 44 -76 l 48 20 q 5 -3 9.5 -6 t 9.5 -5 l 6 -51 h 88 l 6 51 l 4 2 l 4 2 q 2 1 5 3 l 6 4 l 48 -20 l 44 76 l -41 31 v 22 l 219 -127 l -45 79 l 12 9 l -158 92 l -31 54 l -48 -20 q -5 3 -9.5 6 t -9.5 5 l -6 51 h -88 Z m 44 -220 q -25 0 -42.5 17.5 T 180 -280 q 0 25 17.5 42.5 T 240 -220 q 25 0 42.5 -17.5 T 300 -280 q 0 -25 -17.5 -42.5 T 240 -340 Z m 156 -220 l -6 -51 q -2 -2 -5 -3 t -5 -3 v 220 l -15 -26 l -45 19 v -204 l -40 -70 l 40 -31 v -21 l -41 -32 l 44 -76 l 48 20 q 5 -3 9.5 -6 t 9.5 -5 l 6 -51 h 88 l 6 51 l 8 4 q 4 2 11 7 l 48 -20 l 44 76 l -41 31 v 21 l 41 32 l -44 76 l -48 -20 q -5 3 -9.5 6 t -9.5 5 l -6 51 h -88 Z m 44 -220 q -25 0 -42.5 17.5 T 380 -720 q 0 25 17.5 42.5 T 440 -660 q 25 0 42.5 -17.5 T 500 -720 q 0 -25 -17.5 -42.5 T 440 -780 Z m 236 660 l -6 -51 l -8 -4 q -4 -2 -11 -7 l -48 20 l -44 -76 l 41 -31 v -21 l -41 -31 l 44 -77 l 48 20 q 3 -2 4 -2.5 l 15 -7.5 l -216 -152 h 48 l 4 -36 l 195 136 h 63 l 6 51 l 4 2 l 4 2 q 2 1 5 3 l 6 4 l 48 -20 l 44 76 l -41 31 v 21 l 41 32 l -44 76 l -48 -20 q -5 3 -9.5 6 t -9.5 5 l -6 51 h -88 Z m 44 -220 q -25 0 -42.5 17.5 T 660 -280 q 0 25 17.5 42.5 T 720 -220 q 25 0 42.5 -17.5 T 780 -280 q 0 -25 -17.5 -42.5 T 720 -340 Z'
          })
        )
      }
      getShape() {
        const { model } = this.props
        const { width, height, x, y, points } = model
        const { fill, fillOpacity, strokeWidth, stroke, strokeOpacity } = model.getNodeStyle()
        const transform = `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`
        const pointsPath = points.map(point => point.join(',')).join(' ')
        return h(
          'g',
          {
            transform
          },
          [
            h('polygon', {
              points: pointsPath,
              fill,
              stroke,
              strokeWidth,
              strokeOpacity,
              fillOpacity
            }),
            this.getIconShape()
          ]
        )
      }
    }
    class Model extends PolygonNodeModel {
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
        super.initNodeData(data)
        const currentLength = 35
        this.points = [
          [currentLength, 0],
          [currentLength * 2, currentLength],
          [currentLength, currentLength * 2],
          [0, currentLength]
        ]
      }
      // 自定义锚点样式
      getAnchorStyle() {
        const style = super.getAnchorStyle()
        style.hover.r = 8
        style.hover.fill = 'rgb(24, 125, 255)'
        style.hover.stroke = 'rgb(24, 125, 255)'
        return style
      }
    }
    return {
      view: Node,
      model: Model
    }
  })
}
