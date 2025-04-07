import { Block } from "baseui/block"
import { Spinner } from "baseui/spinner"

const PageSpinner = () => {
  return (
    <Block display="flex" justifyContent="center" alignItems="center" height="100%">
      <Spinner />
    </Block>
  )
}

export default PageSpinner;