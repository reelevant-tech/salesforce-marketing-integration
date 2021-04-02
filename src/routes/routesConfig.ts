import BlockListView from "../features/Block/components/BlockListView"
import BlockConfig from "../features/Block/components/BlockConfig"

const routes = [
  {
    key: "1",
    path: ["/"],
    component: BlockListView
  },
  {
    key: "2",
    path: ["/block/:id"],
    component: BlockConfig
  }
]

export { routes }
