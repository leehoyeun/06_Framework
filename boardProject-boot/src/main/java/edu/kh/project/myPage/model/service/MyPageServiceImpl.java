package edu.kh.project.myPage.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.project.member.model.dto.Member;
import edu.kh.project.myPage.model.mapper.MyPageMapper;
import lombok.extern.slf4j.Slf4j;


/**
 *회원 정보 수정 
 */
@Service
@Slf4j
public class MyPageServiceImpl implements MypageService {
	
	@Autowired
	private MyPageMapper mapper;
	
	@Override
		public int updateInfo(Member inputMember, String[] memberAddress) {
		
		//입력된 주소가 있을 경우
		if(!inputMember.getMemberAddress().equals(",,")) {
			
			String address = String.join("^^^", memberAddress);
			inputMember.setMemberAddress(address);
			
		}else {
			inputMember.setMemberAddress(null);
		}
			return mapper.updateInfo(inputMember);
		}

}
