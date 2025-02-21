import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import "./SearchErrorBoundary.css";


interface ErrorBoundaryProps {
  children: ReactNode;
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
    this.state = { hasError: false, error: null };
  }

  handleError = () => {
    this.setState({ hasError: false });
  };

  componentDidCatch(error: Error): void {
    this.setState({ hasError: true, error });
  }
  componentWillUnmount(): void {
      this.setState({ hasError: false });
  }

  render(): ReactNode {
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

export const SearchErrorBoundary = connect()(ErrorBoundary);
