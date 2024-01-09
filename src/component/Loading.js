import { useRecoilValue } from "recoil"
import { risLoading,risLoadingContainer,risFilterChanged } from "./chain/state"

export function Loading() {
    const isLoading = useRecoilValue(risLoading)
    return (
        <div className='row page-container' hidden={isLoading}>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <div className="spinner-border" role="status" hidden={isLoading}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export function LoadingContainer() {
    const isLoading = useRecoilValue(risLoadingContainer)
    const isFilterChanged = useRecoilValue(risFilterChanged)
    return (
        <div className='row page-container' hidden={isLoading}>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <div className="spinner-border" role="status" hidden={isLoading}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}