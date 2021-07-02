import { useTrivia } from './../customHooks'

const withTrivia = props => useTrivia(props) && props.children

export default withTrivia


