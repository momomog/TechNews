import React, {useContext} from 'react'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import {AppThemeContext, ThemeContext} from '../../../context/ThemeContext'

const ProjectStructure: React.FC = () => {
    const {isLight}: AppThemeContext = useContext(ThemeContext)
    const cardClasses: Array<string> = ['panel', 'mh-75', 'panel-default', isLight ? 'background-light' : 'background-dark']

    const nodeId = () => Math.random().toString()

    return (
        <div className="row history-container">
            <div className="col-md-11 center-block pl-0 pr-0">
                <div className={cardClasses.join(' ')}>
                    <div className="panel-heading"><h3>Структура проекта</h3></div>
                    <div className="panel-body">
                        <div>На этой странице можно увидеть реальную файловую структура проекта.</div>
                        <h3 className="mt-3">React</h3>
                        <TreeView defaultCollapseIcon={<ExpandMoreIcon/>}
                                  defaultExpandIcon={<ChevronRightIcon/>}
                                  defaultExpanded={['1']}
                                  multiSelect>
                            <TreeItem nodeId={'1'} label="src">
                                <TreeItem nodeId={nodeId()} label="api">
                                    <TreeItem nodeId={nodeId()} label="AuthAPI.ts"/>
                                    <TreeItem nodeId={nodeId()} label="BaseRequest.ts"/>
                                    <TreeItem nodeId={nodeId()} label="CommentAPI.ts"/>
                                    <TreeItem nodeId={nodeId()} label="MessageAPI.ts"/>
                                    <TreeItem nodeId={nodeId()} label="PostAPI.ts"/>
                                    <TreeItem nodeId={nodeId()} label="ProfileAPI.ts"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="common">
                                    <TreeItem nodeId={nodeId()} label="FormControls">
                                        <TreeItem nodeId={nodeId()} label="DatePicker.tsx"/>
                                        <TreeItem nodeId={nodeId()} label="FileInput.tsx"/>
                                        <TreeItem nodeId={nodeId()} label="Input.tsx"/>
                                        <TreeItem nodeId={nodeId()} label="PostDescription.tsx"/>
                                        <TreeItem nodeId={nodeId()} label="Select.tsx"/>
                                        <TreeItem nodeId={nodeId()} label="TextArea.tsx"/>
                                    </TreeItem>
                                    <TreeItem nodeId={nodeId()} label="AuthService.ts"/>
                                    <TreeItem nodeId={nodeId()} label="Common.ts"/>
                                    <TreeItem nodeId={nodeId()} label="Const.ts"/>
                                    <TreeItem nodeId={nodeId()} label="Validators.ts"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="components">
                                    <TreeItem nodeId={nodeId()} label="core">
                                        <TreeItem nodeId={nodeId()} label="ErrorBoundary.tsx"/>
                                        <TreeItem nodeId={nodeId()} label="NotFoundComponent.tsx"/>
                                        <TreeItem nodeId={nodeId()} label="RedirectComponent.tsx"/>
                                        <TreeItem nodeId={nodeId()} label="Spinner.tsx"/>
                                    </TreeItem>
                                    <TreeItem nodeId={nodeId()} label="Footer">
                                        <TreeItem nodeId={nodeId()} label="Footer">
                                            <TreeItem nodeId={nodeId()} label="History.tsx"/>
                                            <TreeItem nodeId={nodeId()}
                                                      label="ProjectStructure.tsx <== вы находитесь здесь"/>
                                            <TreeItem nodeId={nodeId()} label="Technologies.tsx"/>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="Footer.tsx"/>
                                    </TreeItem>
                                    <TreeItem nodeId={nodeId()} label="Header">
                                        <TreeItem nodeId={nodeId()} label="Login">
                                            <TreeItem nodeId={nodeId()} label="AuthButtons">
                                                <TreeItem nodeId={nodeId()} label="AuthButtons.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="AuthUser">
                                                <TreeItem nodeId={nodeId()} label="AuthUser.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="Login.tsx"/>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="NavLinks">
                                            <TreeItem nodeId={nodeId()} label="NavLinks.tsx"/>
                                            <TreeItem nodeId={nodeId()} label="Search.tsx"/>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="Header.tsx"/>
                                        <TreeItem nodeId={nodeId()} label="HeaderWrapper.tsx"/>
                                    </TreeItem>
                                    <TreeItem nodeId={nodeId()} label="pages">
                                        <TreeItem nodeId={nodeId()} label="AdminPanel">
                                            <TreeItem nodeId={nodeId()} label="AdminPanel.tsx"/>
                                            <TreeItem nodeId={nodeId()} label="AdminPanelWrapper.tsx"/>
                                            <TreeItem nodeId={nodeId()} label="postCreator.js"/>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="authentication">
                                            <TreeItem nodeId={nodeId()} label="Authorization">
                                                <TreeItem nodeId={nodeId()} label="Authorization.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="AuthorizationWrapper.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="LoginForm.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="Registration">
                                                <TreeItem nodeId={nodeId()} label="Registration.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="RegistrationForm.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="RegistrationWrapper.tsx"/>
                                            </TreeItem>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="editPages">
                                            <TreeItem nodeId={nodeId()} label="NewPostPage">
                                                <TreeItem nodeId={nodeId()} label="NewPostPage.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="NewPostPageWrapper.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="PostPageForm.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="PostEdit">
                                                <TreeItem nodeId={nodeId()} label="PostEdit.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="PostEditForm.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="PostEditWrapper.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="ProfileEdit">
                                                <TreeItem nodeId={nodeId()} label="ProfileEditForm">
                                                    <TreeItem nodeId={nodeId()} label="ProfileEditForm.tsx"/>
                                                    <TreeItem nodeId={nodeId()} label="ProfileField.tsx"/>
                                                </TreeItem>
                                                <TreeItem nodeId={nodeId()} label="ProfileEdit.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="ProfileEditWrapper.tsx"/>
                                            </TreeItem>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="Messages">
                                            <TreeItem nodeId={nodeId()} label="messageComponents">
                                                <TreeItem nodeId={nodeId()} label="MessageInput.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="MessageItem.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="UserItem.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="Messages.tsx"/>
                                            <TreeItem nodeId={nodeId()} label="MessagesWrapper.tsx"/>
                                            <TreeItem nodeId={nodeId()} label="MessageWebService.ts"/>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="PostSearch">
                                            <TreeItem nodeId={nodeId()} label="PostSearch.tsx"/>
                                            <TreeItem nodeId={nodeId()} label="PostSearchWrapper.tsx"/>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="PostsList">
                                            <TreeItem nodeId={nodeId()} label="PagesNavigation">
                                                <TreeItem nodeId={nodeId()} label="PagesNavigation.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="PagesNavigationWrapper.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="PostItem.tsx"/>
                                            <TreeItem nodeId={nodeId()} label="PostsList.tsx"/>
                                            <TreeItem nodeId={nodeId()} label="PostsListWrapper.tsx"/>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="PostsReview">
                                            <TreeItem nodeId={nodeId()} label="Comments">
                                                <TreeItem nodeId={nodeId()} label="Comment.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="Comments.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="CommentsWrapper.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="PostAdminPanel">
                                                <TreeItem nodeId={nodeId()} label="PostAdminPanel.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="PostAdminPanelWrapper.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="PostRating">
                                                <TreeItem nodeId={nodeId()} label="PostRating.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="RecommendedPosts">
                                                <TreeItem nodeId={nodeId()} label="RecommendedPosts.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="RecommendedPostsWrapper.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="RecommendedPosts.tsx"/>
                                            <TreeItem nodeId={nodeId()} label="RecommendedPostsWrapper.tsx"/>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="Profile">
                                            <TreeItem nodeId={nodeId()} label="ProfileData">
                                                <TreeItem nodeId={nodeId()} label="ProfileData.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="ProfileImageCutter.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="ProfilePictureModal.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="SocialIcons.tsx"/>
                                                <TreeItem nodeId={nodeId()} label="UserInfoLine.tsx"/>
                                            </TreeItem>
                                            <TreeItem nodeId={nodeId()} label="Profile.tsx"/>
                                            <TreeItem nodeId={nodeId()} label="ProfileWrapper.tsx"/>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="routes.tsx"/>
                                        <TreeItem nodeId={nodeId()} label="SwitchRouter.tsx"/>
                                    </TreeItem>
                                    <TreeItem nodeId={nodeId()} label="App.tsx"/>
                                    <TreeItem nodeId={nodeId()} label="AppWrapper.tsx"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="context">
                                    <TreeItem nodeId={nodeId()} label="AuthContext.ts"/>
                                    <TreeItem nodeId={nodeId()} label="ThemeContext.ts"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="hooks">
                                    <TreeItem nodeId={nodeId()} label="useTheme.ts"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="models">
                                    <TreeItem nodeId={nodeId()} label="CommentModel.ts"/>
                                    <TreeItem nodeId={nodeId()} label="MessageModel.ts"/>
                                    <TreeItem nodeId={nodeId()} label="PostModel.ts"/>
                                    <TreeItem nodeId={nodeId()} label="RequestsModel.ts"/>
                                    <TreeItem nodeId={nodeId()} label="ResponseModel.ts"/>
                                    <TreeItem nodeId={nodeId()} label="UserModel.ts"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="redux">
                                    <TreeItem nodeId={nodeId()} label="actions">
                                        <TreeItem nodeId={nodeId()} label="commentActions.ts"/>
                                        <TreeItem nodeId={nodeId()} label="messageActions.ts"/>
                                        <TreeItem nodeId={nodeId()} label="postActions.ts"/>
                                        <TreeItem nodeId={nodeId()} label="userActions.ts"/>
                                    </TreeItem>
                                    <TreeItem nodeId={nodeId()} label="reducers">
                                        <TreeItem nodeId={nodeId()} label="commentsReducer.ts"/>
                                        <TreeItem nodeId={nodeId()} label="messagesReducer.ts"/>
                                        <TreeItem nodeId={nodeId()} label="postsReducer.ts"/>
                                        <TreeItem nodeId={nodeId()} label="rootReducer.ts"/>
                                        <TreeItem nodeId={nodeId()} label="userReducer.ts"/>
                                    </TreeItem>
                                    <TreeItem nodeId={nodeId()} label="sagas">
                                        <TreeItem nodeId={nodeId()} label="commentSaga.ts"/>
                                        <TreeItem nodeId={nodeId()} label="messageSaga.ts"/>
                                    </TreeItem>
                                    <TreeItem nodeId={nodeId()} label="middleware.ts"/>
                                    <TreeItem nodeId={nodeId()} label="reduxStore.ts"/>
                                    <TreeItem nodeId={nodeId()} label="rootSaga.ts"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="static">
                                    <TreeItem nodeId={nodeId()} label="static files..."/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="styles">
                                    <TreeItem nodeId={nodeId()} label="style files..."/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="history.js"/>
                                <TreeItem nodeId={nodeId()} label="index.tsx"/>
                                <TreeItem nodeId={nodeId()} label="react-app-env.d.ts"/>
                                <TreeItem nodeId={nodeId()} label="serviceWorker.js"/>
                                <TreeItem nodeId={nodeId()} label="web.config"/>
                            </TreeItem>
                        </TreeView>


                        <h3 className="mt-4">Spring</h3>
                        <TreeView defaultCollapseIcon={<ExpandMoreIcon/>}
                                  defaultExpandIcon={<ChevronRightIcon/>}
                                  defaultExpanded={['2']}
                                  multiSelect>
                            <TreeItem nodeId={'2'} label="technews">
                                <TreeItem nodeId={nodeId()} label="common">
                                    <TreeItem nodeId={nodeId()} label="Common"/>
                                    <TreeItem nodeId={nodeId()} label="PostCategoryConst"/>
                                    <TreeItem nodeId={nodeId()} label="Utils"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="config">
                                    <TreeItem nodeId={nodeId()} label="AuditingConfig"/>
                                    <TreeItem nodeId={nodeId()} label="GoogleDriveConfig"/>
                                    <TreeItem nodeId={nodeId()} label="HibernateConfig"/>
                                    <TreeItem nodeId={nodeId()} label="RootConfig"/>
                                    <TreeItem nodeId={nodeId()} label="SecurityConfig"/>
                                    <TreeItem nodeId={nodeId()} label="SessionListener"/>
                                    <TreeItem nodeId={nodeId()} label="SpringContext"/>
                                    <TreeItem nodeId={nodeId()} label="MailConfiguration"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="controller">
                                    <TreeItem nodeId={nodeId()} label="AuthController"/>
                                    <TreeItem nodeId={nodeId()} label="CommentController"/>
                                    <TreeItem nodeId={nodeId()} label="ExceptionHandlerController"/>
                                    <TreeItem nodeId={nodeId()} label="IndexController"/>
                                    <TreeItem nodeId={nodeId()} label="MessageController"/>
                                    <TreeItem nodeId={nodeId()} label="PostController"/>
                                    <TreeItem nodeId={nodeId()} label="UserController"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="dao">
                                    <TreeItem nodeId={nodeId()} label="BaseDao"/>
                                    <TreeItem nodeId={nodeId()} label="CommentDao"/>
                                    <TreeItem nodeId={nodeId()} label="CRUDDao"/>
                                    <TreeItem nodeId={nodeId()} label="DialogDao"/>
                                    <TreeItem nodeId={nodeId()} label="MessageDao"/>
                                    <TreeItem nodeId={nodeId()} label="VerificationTokenDao"/>
                                    <TreeItem nodeId={nodeId()} label="PostDao"/>
                                    <TreeItem nodeId={nodeId()} label="UserProfileDataDao"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="entity">
                                    <TreeItem nodeId={nodeId()} label="security">
                                        <TreeItem nodeId={nodeId()} label="audit">
                                            <TreeItem nodeId={nodeId()} label="DateAudit"/>
                                            <TreeItem nodeId={nodeId()} label="UserDateAudit"/>
                                        </TreeItem>
                                        <TreeItem nodeId={nodeId()} label="Role"/>
                                        <TreeItem nodeId={nodeId()} label="RoleName"/>
                                        <TreeItem nodeId={nodeId()} label="User"/>
                                        <TreeItem nodeId={nodeId()} label="VerificationTokenEntity"/>
                                    </TreeItem>
                                    <TreeItem nodeId={nodeId()} label="BaseEntity"/>
                                    <TreeItem nodeId={nodeId()} label="CommentEntity"/>
                                    <TreeItem nodeId={nodeId()} label="DialogEntity"/>
                                    <TreeItem nodeId={nodeId()} label="MessageEntity"/>
                                    <TreeItem nodeId={nodeId()} label="PostEntity"/>
                                    <TreeItem nodeId={nodeId()} label="UserProfileData"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="exception">
                                    <TreeItem nodeId={nodeId()} label="AppException"/>
                                    <TreeItem nodeId={nodeId()} label="BadRequestException"/>
                                    <TreeItem nodeId={nodeId()} label="ExceptionResponse"/>
                                    <TreeItem nodeId={nodeId()} label="ResourceNotFoundException"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="payload">
                                    <TreeItem nodeId={nodeId()} label="ActionCompleteResponse"/>
                                    <TreeItem nodeId={nodeId()} label="ApiResponse"/>
                                    <TreeItem nodeId={nodeId()} label="CommentUpdateRequest"/>
                                    <TreeItem nodeId={nodeId()} label="IntArrayUserType"/>
                                    <TreeItem nodeId={nodeId()} label="JwtAuthenticationResponse"/>
                                    <TreeItem nodeId={nodeId()} label="LikeRequest"/>
                                    <TreeItem nodeId={nodeId()} label="LoginRequest"/>
                                    <TreeItem nodeId={nodeId()} label="NewPostDataRequest"/>
                                    <TreeItem nodeId={nodeId()} label="PostDataRequest"/>
                                    <TreeItem nodeId={nodeId()} label="SignUpRequest"/>
                                    <TreeItem nodeId={nodeId()} label="UserIdentityAvailability"/>
                                    <TreeItem nodeId={nodeId()} label="UserProfileDataRequest"/>
                                    <TreeItem nodeId={nodeId()} label="UserSummary"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="repository">
                                    <TreeItem nodeId={nodeId()} label="RoleRepository"/>
                                    <TreeItem nodeId={nodeId()} label="UserRepository"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="security">
                                    <TreeItem nodeId={nodeId()} label="CurrentUser"/>
                                    <TreeItem nodeId={nodeId()} label="CustomUserDetailsService"/>
                                    <TreeItem nodeId={nodeId()} label="JwtAuthenticationEntryPoint"/>
                                    <TreeItem nodeId={nodeId()} label="JwtAuthenticationFilter"/>
                                    <TreeItem nodeId={nodeId()} label="JwtTokenProvider"/>
                                    <TreeItem nodeId={nodeId()} label="UserPrincipal"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="service">
                                    <TreeItem nodeId={nodeId()} label="BaseService"/>
                                    <TreeItem nodeId={nodeId()} label="CommentService"/>
                                    <TreeItem nodeId={nodeId()} label="DialogService"/>
                                    <TreeItem nodeId={nodeId()} label="MessageService"/>
                                    <TreeItem nodeId={nodeId()} label="PostService"/>
                                    <TreeItem nodeId={nodeId()} label="UserProfileDataService"/>
                                    <TreeItem nodeId={nodeId()} label="VerificationTokenService"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="ws">
                                    <TreeItem nodeId={nodeId()} label="DialogWebService"/>
                                    <TreeItem nodeId={nodeId()} label="Payload"/>
                                    <TreeItem nodeId={nodeId()} label="PayloadDecoder"/>
                                    <TreeItem nodeId={nodeId()} label="PayloadEncoder"/>
                                </TreeItem>
                                <TreeItem nodeId={nodeId()} label="AppInitializer"/>
                            </TreeItem>

                        </TreeView>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectStructure