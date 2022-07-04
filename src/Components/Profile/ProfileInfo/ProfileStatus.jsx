import React from "react";


class ProfileStatus extends React.Component {
    state = {
        status: this.props.status,
        isEditing: false
    }

    activateEditMode = () => {
        this.setState({
            isEditing: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            isEditing: false
        });
        if (this.props.userId === undefined) {
            this.props.updateStatus(this.state.status, this.props.myUserId);
        } else { alert("Can't update someones status") }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.target.value
        })
    }



    render() {
        return (
            <div>
                {!this.state.isEditing &&
                    <div>
                        {this.props.userId === undefined ?
                            <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                            : <span>{this.props.status}</span>
                        }
                    </div>
                }
                {this.state.isEditing && <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} type="text" value={this.state.status} />
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;