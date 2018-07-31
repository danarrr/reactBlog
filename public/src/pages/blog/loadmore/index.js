import React from 'react'
import './../../style.css'
class LoadMore extends React.Component {
    constructor(props){
        super(props)
    }

    handleLoadMore(){
        this.props.LoadMoreFn();
    }

    componentDidMount(){
        const loadMoreFn = this.props.LoadMoreFn;
        const wrapper = this.refs.wrapper;
        let timeoutId
        function callback(){
            const top = wrapper.getBoundingClientRect().top;//获取按钮到顶部位置
            const windowHeight = window.screen.height;//窗口可视高度
            if(top && top < windowHeight){
                loadMoreFn()
            }
        }
        window.addEventListener("scroll", function(){
            if(this.props.isLoadingMore){
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId =setTimeout(callback, 50)
        }.bind(this),false) //！！必须绑定this,否则绑定的不是同个this对象
    }

    render(){
        return(
            <div className="load-more" ref="wrapper">
                {
                    this.props.isLoadingMore
                    ? <span>努力加载中。。。</span>
                    : <span onClick={this.handleLoadMore.bind(this)}>加载更多</span>
                }
            </div>
        )
    }
}
export default LoadMore
