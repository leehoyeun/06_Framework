package edu.kh.project.myPage.model.service;

import edu.kh.project.member.model.dto.Member;

public interface MypageService {

	/**회원 정보 수정
	 * @param inputMember
	 * @param memberAddress
	 * @return
	 */
	int updateInfo(Member inputMember, String[] memberAddress);

}
