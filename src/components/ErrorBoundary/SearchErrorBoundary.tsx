import { Component, ReactNode } from "react";
import { connect } from "react-redux";
// import { setSearchError } from "../../store/searchSlice";
import "./SearchErrorBoundary.css";


interface ErrorBoundaryProps {
  children: ReactNode;
//   setSearchError: (error: string) => void;
}
interface SearchErrorBoundaryState {
  hasError: boolean;
  error: Error;
}

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  SearchErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    console.log("constructor");
    this.state = { hasError: false, error: null };
  }

  handleError = () => {
    // this.props.setSearchError("");
    this.setState({ hasError: false });
  };

  componentDidCatch(error: Error): void {
    // console.log("catch")
    this.setState({ hasError: true, error });
  }
  componentWillUnmount(): void {
    // console.log("unmount");
    //   this.props.setSearchError("");
      this.setState({ hasError: false });
  }

  render(): ReactNode {
    // console.log("render, hasError: " + this.state.hasError)
    if (this.state.hasError) {
      return (
        <div className="searchBoundary">
        { this.state.error.message === "ERR_BAD_REQUEST" ? <h2 className="searchBoundary_title">
            Whoops! seems like there is no such character in this dimension
          </h2> : <h2 className="searchBoundary_title">
           Seems like the multiverse isn't responding at the moment 
          </h2> }
          <button className="searchBoundary_button"
            onClick={() => {
              this.handleError();
            }}
          >
            Ehmm... Rick?
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
// const props = {
//   setSearchError,
// };

// export const SearchErrorBoundary = connect(null, props)(ErrorBoundary);
export const SearchErrorBoundary = connect()(ErrorBoundary);
