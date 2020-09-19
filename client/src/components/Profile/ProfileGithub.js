import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import "./ProfileGithub.css";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
	useEffect(() => {
		getGithubRepos(username);
	}, [getGithubRepos, username]);

	return (
		<div className="ProfileGithub">
			<span className="page-headers">GitHub Repositories</span>
			<div>
				{repos.map((repo) => (
					<div key={repo.id} className="repo-object">
						<div>
							<div>
								<a
									href={repo.html_url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="repo-name">{repo.name}</span>
								</a>
							</div>
						</div>
						<div className="repo-object-split">
							<ul>
								<li className="badge badge-primary">
									<i class="fa fa-star-o" aria-hidden="true"></i>{" "}
									{repo.stargazers_count}
								</li>
								<li className="badge badge-dark">
									<i class="fa fa-eye" aria-hidden="true"></i>{" "}
									{repo.watchers_count}
								</li>
								<li className="badge badge-light">
									<i class="fa fa-code-fork" aria-hidden="true"></i>{" "}
									{repo.forks_count}
								</li>
							</ul>
							<span className="git-dis">
								{repo.description !== null ? (
									repo.description
								) : (
									<span className="italc-dis">No discription provided</span>
								)}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

ProfileGithub.propTypes = {
	getGithubRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
	username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
