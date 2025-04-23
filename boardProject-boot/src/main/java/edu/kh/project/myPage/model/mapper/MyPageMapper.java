package edu.kh.project.myPage.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.project.member.model.dto.Member;

/**회원 정보 수정
 * 
 */
@Mapper
@Transactional(rollbackFor = Exception.class)
public interface MyPageMapper {

	int updateInfo(Member inputMember);

}
